import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, LogOut } from "lucide-react";
import { AdminLoginPanel } from "@/components/admin/AdminLoginPanel";
import { AdminPostListPanel } from "@/components/admin/AdminPostListPanel";
import { ThoughtPostEditor, type ThoughtEditorState } from "@/components/admin/ThoughtPostEditor";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { areThoughtsAdminFeaturesEnabled, getThoughtsContentService } from "@/lib/thoughts-runtime";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ThoughtCategory, ThoughtPost, ThoughtPostInput } from "@/types/thoughts";

export function AdminPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const thoughtsContentService = useMemo(() => getThoughtsContentService(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [posts, setPosts] = useState<ThoughtPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editor, setEditor] = useState<ThoughtEditorState>(() => createEmptyEditorState());
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingSession(false);
      return;
    }

    let alive = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!alive) {
          return;
        }

        if (error) {
          setAuthError(error.message);
        }

        setSession(data.session);
        setIsCheckingSession(false);
      })
      .catch((error: unknown) => {
        if (!alive) {
          return;
        }

        setAuthError(getErrorMessage(error, "Unable to read the current session."));
        setIsCheckingSession(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthError(null);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!session) {
      setPosts([]);
      setSelectedPostId(null);
      setEditor(createEmptyEditorState());
      setIsCreatingNew(true);
      return;
    }

    void loadPosts();
  }, [session]);

  async function loadPosts() {
    setIsLoadingPosts(true);
    setLoadError(null);

    try {
      const nextPosts = await thoughtsContentService.listAdminPosts();
      setPosts(nextPosts);

      if (selectedPostId) {
        const selectedPost = nextPosts.find((post) => post.id === selectedPostId);

        if (selectedPost) {
          setEditor(toEditorState(selectedPost));
          setIsCreatingNew(false);
        } else if (!isCreatingNew && nextPosts[0]) {
          setSelectedPostId(nextPosts[0].id);
          setEditor(toEditorState(nextPosts[0]));
        } else if (!nextPosts.length && !isCreatingNew) {
          setSelectedPostId(null);
          setEditor(createEmptyEditorState());
          setIsCreatingNew(true);
        }

        return;
      }

      if (!isCreatingNew && nextPosts[0]) {
        setSelectedPostId(nextPosts[0].id);
        setEditor(toEditorState(nextPosts[0]));
      }
    } catch (error) {
      setLoadError(
        `${getErrorMessage(
          error,
          "Unable to load posts.",
        )} Make sure the Supabase schema is applied and your user can access thought_posts.`,
      );
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function handleSignIn(input: { email: string; password: string }) {
    if (!supabase) {
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: input.email.trim(),
      password: input.password,
    });

    if (error) {
      setAuthError(error.message);
    }

    setIsSigningIn(false);
  }

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
    }
  }

  function handleCreateNew() {
    setSelectedPostId(null);
    setEditor(createEmptyEditorState());
    setIsCreatingNew(true);
    setEditorError(null);
    setStatusMessage(null);
  }

  function handleSelectPost(post: ThoughtPost) {
    setSelectedPostId(post.id);
    setEditor(toEditorState(post));
    setIsCreatingNew(false);
    setEditorError(null);
    setStatusMessage(null);
  }

  function handleEditorChange<K extends keyof ThoughtEditorState>(field: K, nextValue: ThoughtEditorState[K]) {
    setEditor((current) => ({
      ...current,
      [field]: nextValue,
    }));
  }

  function handleTitleChange(nextTitle: string) {
    setEditor((current) => {
      const nextSlugFromTitle = slugify(nextTitle);
      const currentTitleSlug = slugify(current.title);
      const shouldUpdateSlug = !current.slug || current.slug === currentTitleSlug;

      return {
        ...current,
        title: nextTitle,
        slug: shouldUpdateSlug ? nextSlugFromTitle : current.slug,
      };
    });
  }

  async function handleUploadCover(file: File) {
    setIsUploadingCover(true);
    setEditorError(null);
    setStatusMessage(null);

    try {
      const coverImage = await thoughtsContentService.uploadCoverImage(file);
      setEditor((current) => ({
        ...current,
        coverImage,
      }));
      setStatusMessage("Cover image uploaded.");
    } catch (error) {
      setEditorError(getErrorMessage(error, "Unable to upload the cover image."));
    } finally {
      setIsUploadingCover(false);
    }
  }

  async function handleSave(published: boolean) {
    const validationMessage = validateEditor(editor);

    if (validationMessage) {
      setEditorError(validationMessage);
      setStatusMessage(null);
      return;
    }

    setIsSaving(true);
    setEditorError(null);
    setStatusMessage(null);

    try {
      const savedPost = await thoughtsContentService.savePost(toThoughtPostInput(editor, published));
      const nextPosts = await thoughtsContentService.listAdminPosts();

      setPosts(nextPosts);
      setSelectedPostId(savedPost.id);
      setEditor(toEditorState(savedPost));
      setIsCreatingNew(false);
      setStatusMessage(published ? "Post published." : "Draft saved.");
    } catch (error) {
      setEditorError(getErrorMessage(error, "Unable to save the post."));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!editor.id) {
      return;
    }

    const shouldDelete = window.confirm("Delete this post?");

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setEditorError(null);
    setStatusMessage(null);

    try {
      await thoughtsContentService.deletePost(editor.id);
      const nextPosts = await thoughtsContentService.listAdminPosts();
      setPosts(nextPosts);

      if (nextPosts[0]) {
        setSelectedPostId(nextPosts[0].id);
        setEditor(toEditorState(nextPosts[0]));
        setIsCreatingNew(false);
      } else {
        setSelectedPostId(null);
        setEditor(createEmptyEditorState());
        setIsCreatingNew(true);
      }

      setStatusMessage("Post deleted.");
    } catch (error) {
      setEditorError(getErrorMessage(error, "Unable to delete the post."));
    } finally {
      setIsDeleting(false);
    }
  }

  if (!areThoughtsAdminFeaturesEnabled()) {
    return (
      <div className="min-h-screen px-3 py-10 md:px-5">
        <div className="shell-container">
          <GlassPanel className="mx-auto max-w-3xl p-6 md:p-8">
            <p className="section-lead">Admin setup</p>
            <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">Supabase is not configured yet.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
              Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_SUPABASE_STORAGE_BUCKET` to your Vercel
              project and local `.env` file. Then run the SQL in `supabase/schema.sql`.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/" className="action-link">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to site
              </a>
            </div>
          </GlassPanel>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 py-6 md:px-5 md:py-8">
      <div className="shell-container space-y-6">
        <header className="glass-panel flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="section-lead">Aditya Anand</p>
            <h1 className="mt-1 font-display text-2xl text-white md:text-3xl">Thoughts Admin</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/" className="action-link">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View site
            </a>
            {session ? (
              <button type="button" onClick={handleSignOut} className="action-link">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            ) : null}
          </div>
        </header>

        {isCheckingSession ? (
          <GlassPanel className="p-6 text-sm text-white/55">Checking admin session...</GlassPanel>
        ) : session ? (
          <div className="grid gap-4 xl:grid-cols-[0.92fr,1.08fr]">
            <AdminPostListPanel
              posts={posts}
              selectedPostId={selectedPostId}
              isLoading={isLoadingPosts}
              loadError={loadError}
              onCreateNew={handleCreateNew}
              onRefresh={() => void loadPosts()}
              onSelect={handleSelectPost}
            />
            <ThoughtPostEditor
              value={editor}
              isSaving={isSaving}
              isDeleting={isDeleting}
              isUploadingCover={isUploadingCover}
              statusMessage={statusMessage}
              errorMessage={editorError}
              onTitleChange={handleTitleChange}
              onChange={handleEditorChange}
              onSaveDraft={() => void handleSave(false)}
              onPublish={() => void handleSave(true)}
              onDelete={() => void handleDelete()}
              onUploadCover={handleUploadCover}
            />
          </div>
        ) : (
          <AdminLoginPanel isSubmitting={isSigningIn} error={authError} onSubmit={handleSignIn} />
        )}
      </div>
    </div>
  );
}

function createEmptyEditorState(): ThoughtEditorState {
  return {
    title: "",
    slug: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Technical",
    tagsText: "",
    excerpt: "",
    coverImage: "",
    readTime: "3 min",
    content: "",
    featured: false,
    published: false,
  };
}

function toEditorState(post: ThoughtPost): ThoughtEditorState {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug || slugify(post.title),
    date: post.date,
    category: normalizeCategory(post.category),
    tagsText: post.tags.join(", "),
    excerpt: post.excerpt,
    coverImage: post.coverImage || "",
    readTime: post.readTime,
    content: post.content,
    featured: Boolean(post.featured),
    published: Boolean(post.published),
  };
}

function toThoughtPostInput(editor: ThoughtEditorState, published: boolean): ThoughtPostInput {
  return {
    id: editor.id,
    slug: slugify(editor.slug || editor.title),
    title: editor.title.trim(),
    date: editor.date,
    category: editor.category,
    tags: editor.tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    excerpt: editor.excerpt.trim(),
    coverImage: editor.coverImage.trim() || undefined,
    readTime: editor.readTime.trim() || "3 min",
    content: editor.content.trim(),
    featured: editor.featured,
    published,
  };
}

function normalizeCategory(category: string): ThoughtCategory {
  if (category === "Life" || category === "Fun") {
    return category;
  }

  return "Technical";
}

function validateEditor(editor: ThoughtEditorState) {
  if (!editor.title.trim()) {
    return "Add a title before saving.";
  }

  if (!slugify(editor.slug || editor.title)) {
    return "Add a valid slug before saving.";
  }

  if (!editor.excerpt.trim()) {
    return "Add a short excerpt before saving.";
  }

  if (!editor.content.trim()) {
    return "Add the markdown content before saving.";
  }

  return null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
