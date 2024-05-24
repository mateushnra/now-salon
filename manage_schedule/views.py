from django.shortcuts import render

from django.shortcuts import render, redirect
from .models import Schedule
from manage_service.models import Service
from manage_employee.models import Employee
from manage_customer.models import Customer
from django.core.paginator import Paginator
from .forms import ScheduleForm

def schedule_list(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "anyItemWasDeleted": False
        }

        schedules = Schedule.objects.all()

        filterOption = request.GET.get('filterOption')
        searchedValue = request.GET.get('filterValue')

        if(filterOption == None):
            filterOption = "Default"

        if request.method == "POST":
            actionScheduleSelected = request.POST.get('actionButton')
            idItemSelected = request.POST.get('selectedId')
            
            match actionScheduleSelected:
                case "edit":
                    return redirect(f'/employee/schedule/edit/{idItemSelected}')
                case "delete":
                    scheduleToDelete = Schedule.objects.get(id=idItemSelected)
                    scheduleToDelete.delete()

                    context["anyItemWasDeleted"] = True
                    
        elif (filterOption):
            match filterOption:
                case "customer":
                    schedules = schedules.filter(idCustomer__name__icontains=searchedValue)
                case "employee":
                    schedules = schedules.filter(idEmployee__name__icontains=searchedValue)
                case "service":
                    schedules = schedules.filter(idService__name__icontains=searchedValue)
                case "date":
                    schedules = schedules.filter(scheduleDate__icontains=searchedValue)
                case "status":
                    if(searchedValue.capitalize() == "Pendente"):
                        searchedValue = "1"
                    elif (searchedValue.capitalize() == "Concluido" or searchedValue.capitalize() == "Concluído"):
                        searchedValue = "2"
                    elif (searchedValue.capitalize() == "Cancelado"):
                        searchedValue = "3"
                    
                    schedules = schedules.filter(status__icontains=searchedValue)
        
        paginator = Paginator(schedules, 2)
        page = request.GET.get('page')
        schedules = paginator.get_page(page)

        context["schedules"] = schedules
        context["searchedValue"] = searchedValue
        context["filterOption"] = filterOption

    else:
        return redirect('/')
        
    return render(request, 'pages/schedule_list.html', context)

def schedule_select_customer(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
        }

        customers = Customer.objects.all()

        searchedOption = request.GET.get('searchButton')
        filterOption = "Default"

        if request.method == "POST":
            idItemSelected = request.POST.get('selectedId')

            return redirect(f'register/{idItemSelected}')
                    
        elif (searchedOption and searchedOption == "searchFilteredValue"):
            filterOption = request.GET.get('filterOption')
            searchedValue = request.GET.get('filterValue')

            match filterOption:
                case "name":
                    customers = customers.filter(name__icontains=searchedValue)
                case "email":
                    customers = customers.filter(email__icontains=searchedValue)
                case "phone":
                   customers = customers.filter(phone__icontains=searchedValue)
            
        context["customers"] = customers
        context["filterOption"] = filterOption
        
    else:
        return redirect('/')
        
    return render(request, 'pages/schedule_select_customer.html', context)

def schedule_register(request, fkcustomer):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        customerSelected = Customer.objects.get(id=fkcustomer)
        form = ScheduleForm()

        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "customerSelected": customerSelected,
            "form": form,
            "scheduleCreated": False,
        }
        

        if request.method == "POST":
            form = ScheduleForm(request.POST)

            if form.is_valid():
                form.save()
                context["scheduleCreated"] = True

    else:
        return redirect('/')
        
    return render(request, 'pages/schedule_register.html', context)


def schedule_edit(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        if request.method == "POST":
            updateSchedule = Schedule.objects.get(id=pk)
            updateSchedule.idEmployee = Employee.objects.get(id=int(request.POST.get("idEmployee")))
            updateSchedule.idService = Service.objects.get(id=int(request.POST.get("idService")))
            updateSchedule.scheduleDate = request.POST.get("scheduleDate")
            updateSchedule.scheduleHour = request.POST.get("scheduleHour")
            updateSchedule.observation = request.POST.get("observation")
            updateSchedule.status = request.POST.get("status")
            updateSchedule.cancellationReason = ""
            updateSchedule.whoCanceled = request.POST.get("whoCanceled")

            if request.POST.get("status") == '3':
                updateSchedule.cancellationReason = request.POST.get("cancellationReason")
                
                updateSchedule.save(update_fields=["idEmployee", "idService", "scheduleDate", "scheduleHour", "observation", "status", "cancellationReason", "whoCanceled"])
            else:
                updateSchedule.save(update_fields=["idEmployee", "idService", "scheduleDate", "scheduleHour", "observation", "status", "cancellationReason", "whoCanceled"])
                
            return redirect('/employee/schedule')
        
        try:
            scheduleSelected = Schedule.objects.get(id=pk)
            form = ScheduleForm()

            if scheduleSelected:
                context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "scheduleSelected": scheduleSelected,
                    "form": form,
                }
            else:
                return redirect('/employee/schedule')
        except Schedule.DoesNotExist:
            return redirect('/employee/schedule')
    return render(request, 'pages/schedule_edit.html', context)
