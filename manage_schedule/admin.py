from django.contrib import admin

from .models import Schedule

class ScheduleAdmin(admin.ModelAdmin):
    list_display=('idCustomer',
                  'idEmployee',
                  'idService',
                  'scheduleDate',
                  'scheduleHour',
                  'status',
                  'observation',
                  'cancellationReason',
                  'whoCanceled',)

admin.site.register(Schedule, ScheduleAdmin)