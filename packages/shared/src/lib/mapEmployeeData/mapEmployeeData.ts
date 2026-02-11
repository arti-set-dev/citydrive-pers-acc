const daysMap: Record<number, string> = {
  1: 'пн',
  2: 'вт',
  3: 'ср',
  4: 'чт',
  5: 'пт',
  6: 'сб',
  7: 'вс',
};

const cityMap: Record<number, string> = {
  1: 'Москва',
  2: 'Санкт-Петербург',
  15: 'Краснодар',
  23: 'Ростов-на-Дону',
  10: 'Казань',
};

const carMap: Record<string, string> = {
  comfort: 'Комфорт',
  economy: 'Эконом',
  premium: 'Премиум',
};

export const mapDays = (days: number[]) =>
  days.map((d) => daysMap[d]).join(', ');
export const mapCars = (cars: string[]) =>
  cars.map((c) => carMap[c] || c).join(', ');
export const mapCities = (cities: number[]) => {
  if (!cities || !cities.length) return 'Не указаны';
  return cities.map((id) => cityMap[id] || `Город ${id}`).join(', ');
};
