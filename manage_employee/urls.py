from django.urls import path
from . import views

urlpatterns = [
    path('employee/employee', views.employee_list, name='employee_list'),
    path('employee/employee/register', views.employee_register, name='employee_register'),
    path('employee/employee/edit/<int:pk>', views.employee_edit, name='employee_edit'),
]