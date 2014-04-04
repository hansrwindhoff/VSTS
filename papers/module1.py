#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      hansw
#
# Created:     02/03/2014
# Copyright:   (c) hansw 2014
# Licence:     <your licence>
#-------------------------------------------------------------------------------

def main():
    pass


def greet(name, age) -> str:
    print('Hello {0}, you are {1} years old'.format(name, age))
    return "hi"


a= greet(1, 28)

if __name__ == '__main__':
    main()