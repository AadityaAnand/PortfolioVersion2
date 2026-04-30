import type { ReactNode } from "react";
import { ImagePlus, Save, Send, Trash2 } from "lucide-react";
import { thoughtCategories } from "@/data/posts";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { ThoughtCategory } from "@/types/thoughts";

export type ThoughtEditorState = {
  id?: string;
  title: string;
  slug: string;
  date: string;
  category: ThoughtCategory;
  tagsText: string;
  excerpt: string;
  coverImage: string;
  bodyImagesText: string;
  readTime: string;
  content: string;
  featured: boolean;
  published: boolean;
};

type ThoughtPostEditorProps = {
  value: ThoughtEditorState;
  isSaving: boolean;
  isDeleting: boolean;
  isUploadingCover: boolean;
  isUploadingBodyImage: boolean;
  statusMessage: string | null;
  errorMessage: string | null;
  onTitleChange: (value: string) => void;
  onChange: <K extends keyof ThoughtEditorState>(field: K, nextValue: ThoughtEditorState[K]) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onDelete: () => void;
  onUploadCover: (file: File) => Promise<void>;
  onUploadBodyImage: (file: File) => Promise<void>;
};

const inputClassName =
  "min-h-[50px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/28";

const textareaClassName =
  "w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/28";

export function ThoughtPostEditor({
  value,
  isSaving,
  isDeleting,
  isUploadingCover,
  isUploadingBodyImage,
  statusMessage,
  errorMessage,
  onTitleChange,
  onChange,
  onSaveDraft,
  onPublish,
  onDelete,
  onUploadCover,
  onUploadBodyImage,
}: ThoughtPostEditorProps) {
  const bodyImages = value.bodyImagesText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <GlassPanel className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-lead">{value.id ? "Edit post" : "New post"}</p>
          <h2 className="mt-1 font-display text-2xl text-white">Editor</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onSaveDraft} className="action-link" disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving && !value.published ? "Saving..." : "Save draft"}
          </button>
          <button type="button" onClick={onPublish} className="action-link action-link-primary" disabled={isSaving}>
            <Send className="mr-2 h-4 w-4" />
            {isSaving && value.published ? "Publishing..." : value.published ? "Update live" : "Publish"}
          </button>
          {value.id ? (
            <button type="button" onClick={onDelete} className="action-link" disabled={isDeleting}>
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          ) : null}
        </div>
      </div>

      {statusMessage ? (
        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100/85">
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100/85">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr,0.95fr]">
        <div className="space-y-4">
          <Field label="Title">
            <input
              value={value.title}
              onChange={(event) => onTitleChange(event.target.value)}
              className={inputClassName}
              placeholder="Why I like unclear problems"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug">
              <input
                value={value.slug}
                onChange={(event) => onChange("slug", event.target.value)}
                className={inputClassName}
                placeholder="why-i-like-unclear-problems"
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                value={value.date}
                onChange={(event) => onChange("date", event.target.value)}
                className={inputClassName}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Category">
              <select
                value={value.category}
                onChange={(event) => onChange("category", event.target.value as ThoughtCategory)}
                className={inputClassName}
              >
                {thoughtCategories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Read time">
              <input
                value={value.readTime}
                onChange={(event) => onChange("readTime", event.target.value)}
                className={inputClassName}
                placeholder="3 min"
              />
            </Field>

            <Field label="Tags">
              <input
                value={value.tagsText}
                onChange={(event) => onChange("tagsText", event.target.value)}
                className={inputClassName}
                placeholder="systems, ai, product"
              />
            </Field>
          </div>

          <Field label="Excerpt">
            <textarea
              rows={3}
              value={value.excerpt}
              onChange={(event) => onChange("excerpt", event.target.value)}
              className={textareaClassName}
              placeholder="A short preview for the public site."
            />
          </Field>

          <Field label="Markdown content">
            <textarea
              rows={18}
              value={value.content}
              onChange={(event) => onChange("content", event.target.value)}
              className={textareaClassName}
              placeholder={"## Start here\n\nWrite your note in markdown."}
            />
          </Field>
        </div>

        <div className="space-y-4">
          <Field label="Cover image URL">
            <input
              value={value.coverImage}
              onChange={(event) => onChange("coverImage", event.target.value)}
              className={inputClassName}
              placeholder="https://..."
            />
          </Field>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-sm text-white/72 transition hover:border-white/20 hover:bg-white/[0.05]">
            <ImagePlus className="h-4 w-4" />
            {isUploadingCover ? "Uploading cover..." : "Upload cover image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                  await onUploadCover(file);
                  event.target.value = "";
                }
              }}
            />
          </label>

          {value.coverImage ? (
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20">
              <img src={value.coverImage} alt={value.title || "Thought cover"} className="h-56 w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center rounded-[22px] border border-white/10 bg-black/20 text-sm text-white/35">
              No cover image selected
            </div>
          )}

          <Field label="Post image URLs">
            <textarea
              rows={5}
              value={value.bodyImagesText}
              onChange={(event) => onChange("bodyImagesText", event.target.value)}
              className={textareaClassName}
              placeholder={"https://...\nhttps://..."}
            />
          </Field>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 bg-white/[0.03] px-4 py-4 text-sm text-white/72 transition hover:border-white/20 hover:bg-white/[0.05]">
            <ImagePlus className="h-4 w-4" />
            {isUploadingBodyImage ? "Uploading post image..." : "Upload image to post"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                  await onUploadBodyImage(file);
                  event.target.value = "";
                }
              }}
            />
          </label>

          {bodyImages.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {bodyImages.map((imageUrl, index) => (
                <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
                  <img src={imageUrl} alt={`Post image ${index + 1}`} className="h-36 w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-36 items-center justify-center rounded-[22px] border border-white/10 bg-black/20 text-sm text-white/35">
              No post images selected
            </div>
          )}

          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-black/20 p-4">
            <ToggleRow
              label="Featured"
              helper="Push this note to the lead slot when it is published."
              checked={value.featured}
              onChange={(checked) => onChange("featured", checked)}
            />
            <ToggleRow
              label="Published"
              helper="Only published posts appear on the public portfolio."
              checked={value.published}
              onChange={(checked) => onChange("published", checked)}
            />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.18em] text-white/42">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  helper,
  checked,
  onChange,
}: {
  label: string;
  helper: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-white/48">{helper}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-white/20 bg-black/20 text-accent focus:ring-accent"
      />
    </label>
  );
}
