from django.urls import path
from . import views

urlpatterns = [
    path('employee/customer', views.customer, name='customer'),
    path('employee/customer/register', views.customer_register, name='customer_register'),
    path('employee/customer/edit/<int:pk>', views.customer_edit, name='customer_edit'),
]