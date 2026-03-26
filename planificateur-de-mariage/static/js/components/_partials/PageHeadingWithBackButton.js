import { useNavigate } from 'react-router-dom';

export default function PageHeadingWithBackButton({ title }) {

  const navigate = useNavigate();

  return (<div className="td-container py-6">
    <h1 className="text-lg font-medium flex items-center space-x-4"><button onClick={() => navigate(-1)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
    </svg></button><span>{title}</span></h1>
  </div>)
}