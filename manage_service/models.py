from django.db import models

STATUS_CHOICES=(
    ('1','Ativo'),
    ('2','Inativo'),
)

class Service(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=200, null=False)
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=1)
    estimatedTime = models.TimeField(null=False)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    def __str__(self):
        return self.name