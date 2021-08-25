from django import template

register = template.Library()

@register.filter
def replace_char_date(value):
    return value.replace("/","-")

@register.filter
def set_yes_no(value):
    if value == 'N':
        return 'No'
    else:
        return 'Si'