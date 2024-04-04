from django.contrib import admin

from .models import Employee, EmployeeHasServices

class EmployeeAdmin(admin.ModelAdmin):
    pass

class EmployeeHasServicesAdmin(admin.ModelAdmin):
    pass

admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeHasServices, EmployeeHasServicesAdmin)