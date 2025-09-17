import Header from "./Header";
import CodeExpForm from "./forms/CodeExpForm";

const CodexBlock = () => {
  return (
       <div className="min-h-screen flex flex-col items-center p-6 gap-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
    <Header />
     <CodeExpForm />
    </div>

  )
}

export default CodexBlock;