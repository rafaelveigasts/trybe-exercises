salary = 5500
if salary <= 2000:
   print( "estagiário")
elif 2000 < salary <= 5800:
    print("júnior")
elif 5800 < salary <= 7500:
    print("pleno")
elif 7500 < salary <= 10500:
    print("senior")
else:
    print("líder")


key = "id"
from_to = {
    "id": "identifier",
    "mail": "email",
    "lastName": "last_name",
}
print(from_to[key])