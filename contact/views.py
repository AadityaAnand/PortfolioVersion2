from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm
from .models import Contact
from core.content import CONTACT_CHANNELS, CONTACT_NOTES, SITE_NAME, SITE_ROLE, build_nav_items, build_page_paths

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            Contact.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                subject=form.cleaned_data['subject'],
                message=form.cleaned_data['message']
            )
            messages.success(request, 'Message received. I will get back to you soon.')
            return redirect('contact')
    else:
        form = ContactForm()

    context = {
        "form": form,
        "site_name": SITE_NAME,
        "site_role": SITE_ROLE,
        "page_key": "contact",
        "nav_items": build_nav_items("contact"),
        "page_paths": build_page_paths("contact"),
        "contact_channels": CONTACT_CHANNELS,
        "contact_notes": CONTACT_NOTES,
    }
    return render(request, "contact/contact.html", context)
