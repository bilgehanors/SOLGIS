from django.shortcuts import render

# Create your views here.
def index(request):
  return render(request, 'index.html')

def map(request):
  return render(request, 'map.html')

def about(request):
  return render(request, 'about.html')

def calculate(request):
  return render(request, 'calculate.html')


import math

def calculate_effective_sunlight(slope, orientation):
    if orientation == 'north':
        return 0.7 * math.cos(math.radians(slope))
    elif orientation == 'east' or orientation == 'west':
        return 0.8 * math.sin(math.radians(slope))
    elif orientation == 'south':
        return 0.9 * math.cos(math.radians(slope))
    else:
        raise ValueError("Invalid orientation")


def calculate_panel_energy(watt_per_hour, effective_sunlight):
    return int(watt_per_hour) * (effective_sunlight) / 100 * 30 

def calculate_total_wattage(slope, number_of_panels, watt_per_hour, position):
    total_wattage = 0
    effective_sunlight = calculate_effective_sunlight(slope, position)
    panel_energy = calculate_panel_energy(watt_per_hour, effective_sunlight)
    total_wattage += panel_energy * number_of_panels

    return total_wattage



def calculate_watt(panel):
    watt_per_panel_per_hour = 600
    num_panels = panel
    hours_of_sunlight_per_day = 7

    daily_wattage = int(num_panels) * int(watt_per_panel_per_hour)  * int(hours_of_sunlight_per_day)

    return int(daily_wattage)

def suggest_panel(total_kw):
   if total_kw > 130:
      return calculate_watt(1)
   elif total_kw > 260:
      return calculate_watt(2)
   elif total_kw > 260:
      return calculate_watt(3)
   elif total_kw > 260:
      return calculate_watt(4)
   elif total_kw > 260:
      return calculate_watt(5)
   elif total_kw > 260:
      return calculate_watt(6)
   elif total_kw > 260:
      return calculate_watt(7)
   elif total_kw > 260:
      return calculate_watt(8)
   
def slope_get(slope):
    if slope == 'flat':
      return slope == 2 
    elif slope == 'slightly':
      return slope == 7 
    elif slope == 'inclined':
      return slope == 15 
    elif slope == 'very':
      return slope == 25

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def calculate_area(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        area_value = float(data.get('area', '0'))
        if area_value == 0:
            return JsonResponse({'error': 'Please select an area'})
        else:
            slope_value = data.get('slope', 'flat')  
            slope_num = slope_get(slope_value)
            position_value = data.get('position', 'north')  
            watt_price = float(data.get('use', '1500'))
            watt_use = int(watt_price / 1.13)
            watt_per_hour = 600
            suggest_panel(watt_use)
            number_of_panels = int(watt_use/130)
            total_wattage = calculate_total_wattage(slope_num, number_of_panels, watt_per_hour,position_value)
                

            return JsonResponse({'result': f'The calculated used watt is {watt_use} kw and {number_of_panels} panel needed and it will produce {total_wattage} kw energy'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

    