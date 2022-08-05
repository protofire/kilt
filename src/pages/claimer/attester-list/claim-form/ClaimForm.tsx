import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../../../components/Topbar/Topbar';
import useClaimer from '../../../../hooks/claimer';
import { IAttesterCtype } from '../../../../interfaces/attester-ctype';
import { formatDid } from '../../../../utils/string';

function ClaimForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { submitClaim, onLoadAttesterCtype, loading } = useClaimer();

  const [files, setFiles] = useState<FileList | null>(null);
  const [text, setText] = useState<string>('');
  const [attester, setAttester] = useState<IAttesterCtype | null>(null);

  useEffect(() => {
    if (!params.id) return goBack();
    onLoadAttesterCtype(params.id).then(setAttester);
  }, []);

  const onFileChange = (files: FileList | null) => setFiles(files);
  const onTextChange = (text: string) => setText(text);

  const goBack = () => navigate('/claimer', { replace: true });
  const onSubmit = () => submitClaim(text, files).then(goBack);

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading ... </div>
        : <div className='column page'>
          <span className='title'>Claim Your Identity</span>
          <span className='subtitle'>
            Attester: <strong>{formatDid(attester?.attesterDid ?? '')}</strong>
          </span>
          <span className='subtitle'>Terms and Conditions</span>
          <span className='text'>
            {attester?.terms}
          </span>
          <div>
            <hr />
          </div>
          <label className='subtitle'>
            Include all the relevant information and/or files for the attester.
            <br />
            <textarea name="introduction" placeholder='Introduce yourself'
              onChange={(e) => onTextChange(e.target.value)} cols={40}></textarea>
          </label>
          <div>
            <input type="file" onChange={(e) => onFileChange(e.target.files)} multiple/>
          </div>
          <div>
            <button className='secondary' onClick={goBack}>Cancel</button>
            <button className='primary'onClick={onSubmit}>Submit</button>
          </div>
        </div>}
    </div>
  );
}

export default ClaimForm;
