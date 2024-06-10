export default function BlankCard() {
  return <div className="bg-fiord-200 rounded-lg shadow-md w-full h-14 flex items-center justify-center">
    <div className="flex px-2 h-full w-full items-center">
        <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Adicione uma Categoria
        </p>
    </div>
  </div>;
}

