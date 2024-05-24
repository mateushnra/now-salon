from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import Employee
from manage_service.models import Service
from .forms import EmployeeForm
from django.core.paginator import Paginator

def employee_list(request):
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

        employees = Employee.objects.all()

        filterOption = request.GET.get('filterOption')
        searchedValue = request.GET.get('filterValue')

        if(filterOption == None):
            filterOption = "Default"

        if request.method == "POST":
            actionEmployeeSelected = request.POST.get('actionButton')
            idItemSelected = request.POST.get('selectedId')
            
            match actionEmployeeSelected:
                case "edit":
                    return redirect(f'/employee/employee/edit/{idItemSelected}')
                case "delete":
                    employeeToDelete = Employee.objects.get(id=idItemSelected)
                    employeeToDelete.delete()

                    context["anyItemWasDeleted"] = True
                    
        elif (filterOption):
            match filterOption:
                case "register":
                    employees = employees.filter(id__icontains=searchedValue)
                case "name":
                    employees = employees.filter(name__icontains=searchedValue)
                case "phone":
                    employees = employees.filter(phone__icontains=searchedValue)
                case "role":
                    employees = employees.filter(role__icontains=searchedValue)
                case "accessLevel":
                    if(searchedValue.capitalize() == "Gerente"):
                        searchedValue = "1"
                    elif (searchedValue.capitalize() == "Funcionario"):
                        searchedValue = "2"

                    employees = employees.filter(accessLevel__icontains=searchedValue)
            
        paginator = Paginator(employees, 2)
        page = request.GET.get('page')
        employees = paginator.get_page(page)

        context["employees"] = employees
        context["searchedValue"] = searchedValue
        context["filterOption"] = filterOption
        
    else:
        return redirect('/')
        
    return render(request, 'pages/employee_list.html', context)

def employee_register(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        services = Service.objects.all()

        context = {
            "employeeLoggedIn": True,
            "employeeAccessLevel": request.session["employee_access_level"],
            "employeeName": request.session["employee_name"],
            "employeeCreated": False,
            "services": services,
        }

        if request.method == "POST":
            form = EmployeeForm(request.POST)

            if form.is_valid():
                form.save()
                context["employeeCreated"] = True

    else:
        return redirect('/')
        
    return render(request, 'pages/employee_register.html', context)

def employee_edit(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        if request.method == "POST":
            updateEmployee = Employee.objects.get(id=pk)
            updateEmployee.name = request.POST.get("name")
            updateEmployee.phone = request.POST.get("phone")
            updateEmployee.role = request.POST.get("role")
            updateEmployee.accessLevel = request.POST.get("accessLevel")

            updateEmployee.service.set(request.POST.getlist("service"))

            if request.POST.get("password") != '':
                updateEmployee.password = request.POST.get("password")

                updateEmployee.save(update_fields=["name", "phone", "role", "accessLevel", "password"])
            else:
                updateEmployee.save(update_fields=["name", "phone", "role", "accessLevel"])
                
            return redirect('/employee/employee')
        
        try:
            services = Service.objects.all()
            employeeSelected = Employee.objects.get(id=pk)

            if employeeSelected:
                context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "employeeSelected": employeeSelected,
                    "services": services,
                }
            else:
                return redirect('/employee/employee')
        except Employee.DoesNotExist:
            return redirect('/employee/employee')
    return render(request, 'pages/employee_edit.html', context)
