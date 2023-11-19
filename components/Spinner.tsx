export default function Spinner() {
    return (
        <span className="h-500 w-full flex justify-center items-center">
          <span className="animate-ping flex h-5 w-5  rounded-full bg-green-700 opacity-75"></span>
        </span>
    );
}