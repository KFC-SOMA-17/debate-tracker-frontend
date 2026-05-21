import { APP_NAME } from "@/shared/lib/app";

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <p className="text-lg font-medium">Hello {APP_NAME}</p>
    </div>
  );
}
