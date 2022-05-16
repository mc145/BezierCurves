import math 
p0 = 1.5
p1 = 9.2
p2 = 17
p3 = 13.2 
def compute(t):
    return p0 * (-3*t*t + 6*t - 3) + p1*(3-12*t+9*t*t) + p2*(6*t-9*t*t) + p3*t*t*3

def quadratic(co1, co2, co3):
    return [(-1*co2 + math.sqrt(co2*co2 - 4*co1*co3))/(2*co1),(-1*co2 - math.sqrt(co2*co2 - 4*co1*co3))/(2*co1)]



print(quadratic(-3*p0 + 9*p1 - 9*p2 + 3*p3, 6*p0 - 12*p1 + 6*p2, 3*p1 - 3*p0)) 
#print(-3*p0 + 9*p1 - 9*p2 + 3*p3, 6*p0 - 12*p1 + 6*p2, 3*p1 - 3*p0) 


#print(quadratic(1,-4,-9))