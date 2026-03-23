from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "field-input",
                "placeholder": "Your name",
                "autocomplete": "name",
            }
        ),
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "class": "field-input",
                "placeholder": "name@company.com",
                "autocomplete": "email",
            }
        ),
    )
    subject = forms.CharField(
        max_length=200,
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "field-input",
                "placeholder": "What are we discussing?",
            }
        ),
    )
    message = forms.CharField(
        required=True,
        widget=forms.Textarea(
            attrs={
                "class": "field-input field-textarea",
                "placeholder": "Share the role, system, or project context.",
                "rows": 7,
            }
        ),
    )
