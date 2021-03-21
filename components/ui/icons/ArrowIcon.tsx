
type ArrowIconProperties = {
  direction?: 'down';
}

const render = {
  down: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>,
};

export default function ArrowIcon({ direction = 'down' }: ArrowIconProperties) {
  return render[direction]();
};
