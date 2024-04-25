from django import forms
from .models import Salon


class SalonForm(forms.ModelForm):
    class Meta:
        model = Salon
        fields = "__all__"
        widgets = {
            'openHour': forms.TimeInput(attrs={'type': 'time'}),
            'closeHour': forms.TimeInput(attrs={'type': 'time'}),
        }