import sys

def select_file(file_name):
    try:
        f = open(file_name,"r")
        return f.readlines()
     
    except Exception as error:
        print(f"you have not provided a valif file path : \n {error}")
        sys.exit()

# create lists  based on 
q= []
a1=[]
a2=[]
a3=[]
a4=[]

# read file 
output = select_file(sys.argv[1])

# empty dict that contains encoded csv 
csv_to_string = "".join(output).replace("\n",",").split(",")

num_of_headings = 5
for i in range(len(csv_to_string)):
    if i% num_of_headings ==0:
        q.append(csv_to_string[i])
        a1.append(csv_to_string[i+1])
        a2.append(csv_to_string[i+2])
        a3.append(csv_to_string[i+3])
        a4.append(csv_to_string[i+4])

resquest = {q[0]:q[1:],a1[0]:a1[1:],a2[0]:a2[1:],a3[0]:a3[1:],a4[0]:a4[1:]}      
print(resquest.get(q[0])[0])


# num_headings= 5
# for i in range(0,num_headings):
#     resquest[csv_to_string[i]]=csv_to_string[i+num_headings]
# print(resquest)




