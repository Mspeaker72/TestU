import sys

def select_file(file_name):
    try:
        f = open(file_name,"r")
        return f.readlines()
    
    except Exception as error:
        print(error)
        sys.exit()

# read file 
output = select_file(sys.argv[1])
resquest = {}
# empty dict that contains encoded csv 
csv_to_string = "".join(output).replace("\n",",").split(",")
print(csv_to_string)
num_headings= 5
for i in range(0,num_headings):
    resquest[csv_to_string[i]]=csv_to_string[i+num_headings]
print(resquest)




