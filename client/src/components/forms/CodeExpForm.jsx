import { useActionState } from "react";
import { explain } from "../../actions";
import CodeExplain from "../CodeExplain";
import Error from "../Error";

const CodeExpForm = () => {
  const [formState, formAction, isPending] = useActionState(explain, null);
  return (
    <div className="w-full h-[45vh] mt-10 max-w-xl mx-auto bg-gradient-to-br from-[#18181b]/80 via-[#27272a]/70 to-[#18181b]/80 rounded-xl shadow-xl backdrop-blur-md border border-white/10 relative overflow-y-auto">
        <form action={formAction} className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="block text-base font-semibold text-white/80 text-center">Language</label>
          <select
            name="language"
            className="border-none rounded-lg px-3 py-2  text-xl bg-white/5 text-white/90 focus:ring-2 focus:ring-white-400 transition text-center outline-none w-[30%]"
          >
            <option value="javascript" className="text-black">JavaScript</option>
            <option value="python" className="text-black">Python</option>
            <option value="java" className="text-black">Java</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <label className="block mb-1 text-base font-semibold text-white/80 text-center">Your Code</label>
          <textarea
            name="code"
            required
            placeholder="Paste your code here..."
            className="rounded-lg w-[70%] px-7 py-8 font-mono text-sm bg-white/5 text-white/90 min-h-[120px] focus:ring-2 focus:ring-purple-400 transition resize-none text-xl text-center  "
          />
            <button
          type="submit"
          disabled={isPending}
          className="w-[30%] rounded-lg bg-gray-600 hover:bg-gradient-to-r from-blue-600/80 via-indigo-500/80 to-purple-600/80 text-white font-semibold text-base shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mx-6 my-3 cursor-pointer relative self-center"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" /></svg>
              Explaining...
            </span>
          ) : "Explain Code"}
        </button>
        </div>

      
      </form>
      <div className="absolute top-0 right-5">
        <span className="rounded-xl bg-white/10 text-xs text-white/70 font-medium shadow">AI Powered</span>
      </div>
      <div className="mt-4">
        {isPending ? (
          <p className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse my-2 w-48 p-2 rounded text-white/80 text-center shadow">Thinking...</p>
        ) : formState?.success ? (
          <CodeExplain explanation={formState?.data.explanation} />
        ) : (
          formState?.success === false && (
            <Error error={formState?.error} />
          )
        )}
      </div>
    </div>
  );
};

export default CodeExpForm;