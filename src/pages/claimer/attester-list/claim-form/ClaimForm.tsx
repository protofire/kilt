import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../../../components/Topbar/Topbar';
import useClaimer from '../../../../hooks/claimer';
import useUser from '../../../../hooks/user';
import { IAttesterCtype } from '../../../../interfaces/attester-ctype';
import { formatDidUri } from '../../../../utils/formatDidUri';

function ClaimForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { submitClaim, onLoadAttesterCtype, loading } = useClaimer();

  const [attesterCtype, setAttesterCtype] = useState<IAttesterCtype | null>(null);
  const [properties, setProperties] = useState<string[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!params.id) return goBack();
    onLoadAttesterCtype(params.id).then((a) => {
      setAttesterCtype(a);
      const propertyList = [...Object.keys(a.properties ?? {})];
      setProperties(propertyList);
    });
  }, []);

  const goBack = () => navigate('/claimer', { replace: true });

  const onSubmit = async () => {
    if (!user || !attesterCtype) return;
    await submitClaim(user.didUri, attesterCtype, form);
    goBack();
  };

  const onChangeInput = (property: string, value: string) =>
    setForm((form: any) => {
      form[property] = value;
      return form;
    });

  return (
    <div className='wrapper'>
      <Topbar />
      {loading
        ? <div> Loading ... </div>
        : <div className='column page'>
          <span className='title'>Claim Your Identity</span>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className='subtitle'>
              Attester:
              <strong>
                {attesterCtype &&
                  ` ${formatDidUri(attesterCtype.attesterDidUri)} (${attesterCtype.ctypeName})`}
              </strong>
            </span>
            <span className='subtitle'>
              Quote: {attesterCtype && ` ${attesterCtype.quote} KILT`}
            </span>
          </div>
          <span className='subtitle'>Terms and Conditions</span>
          <div className='text'>
            {attesterCtype && attesterCtype.terms}
          </div>
          <div>
            <hr />
          </div>
          <div className='subtitle'>
            <span>
              Fill the required fields to request
            </span>
            <br /><br />
            <span className='text'>
              {properties.map(k =>
                <input
                  key={k}
                  placeholder={k}
                  onChange={(e) => onChangeInput(k, e.target.value)}
                />)}
            </span>
            <br /><br />
          </div>
          <div>
            <button className='secondary' onClick={goBack}>Cancel</button>
            <button className='primary' onClick={onSubmit}>Submit</button>
          </div>
        </div>}
    </div>
  );
}

export default ClaimForm;
