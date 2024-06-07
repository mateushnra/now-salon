from django.shortcuts import render, redirect
from manage_employee.models import Employee
from manage_schedule.models import Schedule
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.hashers import check_password
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
import json

def portal(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}
        
    return render(request, 'pages/portal.html', context)

def authenticateEmployee(request):
    is_fetch = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_fetch:
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                registerId = data.get('registerId')
                password = data.get('password')

                employeeFound = Employee.objects.get(id=registerId)
                
                if check_password(password, employeeFound.password):
                    request.session["employee_id"] = employeeFound.id
                    request.session["employee_name"] = employeeFound.name
                    request.session["employee_access_level"] = employeeFound.accessLevel
                    return JsonResponse({"success": True, 'errorMsg': ""})
                else:
                    return JsonResponse({"success": False, 'errorMsg': "Matrícula ou senha incorreto"})
            except Employee.DoesNotExist:
                return JsonResponse({"success": False, 'errorMsg': "Este funcionário não existe!"})
    else:
        return HttpResponseRedirect(reverse('index'))
    

def employee(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session:
        context = {"employeeLoggedIn": True, "employeeAccessLevel": request.session["employee_access_level"], "employeeName": request.session["employee_name"]}

        schedules = Schedule.objects.filter(idEmployee_id=request.session["employee_id"])

        today = timezone.now().date()
        one_week_later = today + timedelta(days=7) 

        pending_schedules = schedules.filter(
            Q(status='1') & 
            Q(scheduleDate__gte=today) & 
            Q(scheduleDate__lte=one_week_later)
        )

        context["schedules"] = schedules 
        context["pending_schedules"] = pending_schedules 
    else:
        return redirect('/')
        
    return render(request, 'pages/employee.html', context)