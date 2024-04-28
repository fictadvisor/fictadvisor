import { ReadonlyURLSearchParams } from 'next/navigation';

const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return '?' + params.toString();
};
export default createQueryString;
