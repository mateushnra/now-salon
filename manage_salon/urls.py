from django.urls import path
from . import views

urlpatterns = [
    path('employee/salon/<pk>', views.salon, name='salon'),
]