from django.db import models

SCHEDULE_STATUS_CHOICES=(
    ('1','Pendente'),
    ('2','Concluído'),
    ('3','Cancelado'),
)

USER_CANCELED_CHOICES=(
    ('1','Cliente'),
    ('2','Funcionário'),
)

class Schedule(models.Model):
    idCustomer = models.ForeignKey(
        "manage_customer.Customer",
        on_delete=models.PROTECT,
    )
    idEmployee = models.ForeignKey(
        "manage_employee.Employee",
        on_delete=models.PROTECT,
    )
    idService = models.ForeignKey(
        "manage_service.Service",
        on_delete=models.PROTECT,
    )
    scheduleDate = models.DateField(auto_now=False, auto_now_add=False)
    scheduleHour = models.CharField(max_length=5, null=False)
    status = models.CharField(max_length=9, choices=SCHEDULE_STATUS_CHOICES, default=1)
    observation = models.CharField(max_length=200, null=False, blank=True)
    cancellationReason = models.CharField(max_length=200, null=False, blank=True)
    whoCanceled = models.CharField(max_length=11, choices=USER_CANCELED_CHOICES, default=1, blank=True)
    
    def __str__(self):
        return self.scheduleDate