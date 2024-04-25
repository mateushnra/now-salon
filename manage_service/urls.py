from django.urls import path
from . import views

urlpatterns = [
    path('employee/service', views.service, name='service'),
    path('employee/service/register', views.service_register, name='service_register'),
    path('employee/service/edit/<int:pk>', views.service_edit, name='service_edit'),
]