export default function App() {
  const [count, setCount] = this.useState(0);
  console.log(this);

  document.increment = () => setCount(count + 1);

  return `
    
      <div class="container">
      <p>count: ${count}</p>
      <button onclick="increment()">증가</button>
    </div>
    
  `;
}
