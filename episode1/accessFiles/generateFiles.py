import random, string, os

def randomword(length):
   letters = string.ascii_lowercase
   return ''.join(random.choice(letters) for i in range(length))

for i in range(15):
    f = open('{}.txt'.format(randomword(5)), 'w')
    f.write(randomword(20))
    f.close()
