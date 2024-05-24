from django.db import migrations, models

def insert_initial_data(apps, schema_editor):
    Salon = apps.get_model('manage_salon', 'Salon')
    Salon.objects.create(
        name='Now Salon',
        phone='18 99999-9999',
        daysWeekOpen='Terca, Quarta, Quinta, Sexta, Sabado',
        openHour='08:00',
        closeHour='18:00',
        email='nowsalon@contato.com',
        status='1', 
        address='Rua fulano de tal, 177',
        neighborhood='Bairro ali perto',
        cityState='Aracatuba, SP'
)

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Salon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=13)),
                ('daysWeekOpen', models.CharField(max_length=150)),
                ('openHour', models.TimeField()),
                ('closeHour', models.TimeField()),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('status', models.CharField(choices=[('1', 'Ativo'), ('2', 'Reformando'), ('3', 'Inativo')], default=1, max_length=12)),
                ('address', models.CharField(max_length=100)),
                ('neighborhood', models.CharField(max_length=100)),
                ('cityState', models.CharField(max_length=50)),
            ],
        ),
        migrations.RunPython(insert_initial_data),
    ]
