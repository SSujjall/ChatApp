import WaitingRoom from "./components/WaitingRoom";

function App() {
  return (
    <div>
      <div className="mt-6 flex flex-col justify-center text-center">
        <p className="text-6xl font-bold text-stone-700">Chat Room</p>
        <WaitingRoom />
      </div>
    </div>
  );
}

export default App;
