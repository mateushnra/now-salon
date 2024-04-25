from django.shortcuts import render, redirect
from .models import Service
from .forms import ServiceForm

def service(request):
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

        services = Service.objects.all()

        searchedOption = request.GET.get('searchButton')
        filterOption = "Default"

        if request.method == "POST":
            actionServiceSelected = request.POST.get('actionButton')
            idItemSelected = request.POST.get('selectedId')
            match actionServiceSelected:
                case "edit":
                    return redirect(f'/employee/service/edit/{idItemSelected}')
                case "delete":
                    serviceToDelete = Service.objects.get(id=idItemSelected)
                    serviceToDelete.delete()

                    context["anyItemWasDeleted"] = True
                    
        elif (searchedOption and searchedOption == "searchFilteredValue"):

            filterOption = request.GET.get('filterOption')
            searchedValue = request.GET.get('filterValue')

            match filterOption:
                case "name":
                    services = services.filter(name__icontains=searchedValue)
                case "duration":
                    services = services.filter(estimatedTime__icontains=searchedValue)
                case "price":
                    services = services.filter(price__lt=(float(searchedValue) + 1))
                case "status":
                    if(searchedValue.capitalize() == "Ativo"):
                        searchedValue = "1"
                    elif (searchedValue.capitalize() == "Inativo"):
                        searchedValue = "2"

                    services = services.filter(status__icontains=searchedValue)

        context["services"] = services
        context["filterOption"] = filterOption
        
    else:
        return redirect('/')
        
    return render(request, 'pages/service.html', context)

def service_register(request):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "serviceCreated": False,
        }

        if request.method == "POST":
            form = ServiceForm(request.POST)

            if form.is_valid():
                form.save()

                context["serviceCreated"] = True
    else:
        return redirect('/')
        
    return render(request, 'pages/service_register.html', context)

def service_edit(request, pk):
    if "customer_id" in request.session:
        return redirect('/')
    else:
        context = {"customerLoggedIn": False}

    if "employee_id" in request.session and request.session["employee_access_level"] == "1":
        if request.method == "POST":
            updateService = Service.objects.get(id=pk)
            form = ServiceForm(instance=updateService)
            form = ServiceForm(instance=updateService, data=request.POST)
            print(form)
            if form.is_valid():
                form.save()
                return redirect('/employee/service')
        
        try:
            serviceSelected = Service.objects.get(id=pk)
            serviceSelected.price = str(serviceSelected.price)

            if serviceSelected:
                context = {
                    "employeeLoggedIn": True,
                    "employeeAccessLevel": request.session["employee_access_level"],
                    "employeeName": request.session["employee_name"],
                    "serviceSelected": serviceSelected,
                }
            else:
                return redirect('/employee/service')
        except Service.DoesNotExist:
            return redirect('/employee/service')
    return render(request, 'pages/service_edit.html', context)