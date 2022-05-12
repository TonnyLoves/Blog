#include <iostream>

using namespace std;

class Box {
    public:
        double length;

        double getLength() {
            return this->length;
        }
};

int main()
{
    Box *box1;
    box1->length = 10.0;
    cout << box1->getLength() << endl;
    return 0;
};

