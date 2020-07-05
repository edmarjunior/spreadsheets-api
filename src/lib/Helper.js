export function compare(a, b, property, direction = 'desc') {
    
    let ret = 0;

    if (direction === 'desc') {
        if (+a[property] > +b[property]) {
            ret = -1;
        } else if (+a[property] < +b[property]) {
            ret = 1;
        }
        return ret;
    }

    if (+a[property] > +b[property]) {
        ret = 1;
    } else if (+a[property] < +b[property]) {
        ret = -1;
    }
    
    return ret;
}

export function convertToHour(minutos) {
    return (minutos / 60).toFixed(2);
}

export function sum(array, coluna) {
    const total = array.reduce((acumulador, current) => {
        return acumulador + +current[coluna];
      }, 0);

    return total.toFixed(2);
}

export const convertToNumericMonth = (monthLiteral) => {
    monthLiteral = monthLiteral.toLowerCase();
    switch(monthLiteral) {
        case 'janeiro': return 1;
        case 'fevereiro': return 2;
        case 'março': return 3;
        case 'marco': return 3;
        case 'abril': return 4;
        case 'maio': return 5;
        case 'junho': return 6;
        case 'julho': return 7;
        case 'agosto': return 8;
        case 'setembro': return 9;
        case 'outubro': return 10;
        case 'novembro': return 11;
        case 'dezembro': return 12;
        default: return null;
    }
}