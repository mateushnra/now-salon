from django.contrib import admin

from .models import Service

class ServiceAdmin(admin.ModelAdmin):
    pass

admin.site.register(Service, ServiceAdmin)