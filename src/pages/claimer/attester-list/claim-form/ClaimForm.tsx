import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onLoadAttesterCtype } from '../../../../api/claimer/loadAttesterCtype';
import { createCredential } from '../../../../api/credential/createCredential';
import Topbar from '../../../../components/Topbar/Topbar';
import useUser from '../../../../hooks/user';
import { IAttesterCtype } from '../../../../interfaces/attesterCtype';
import { formatDidUri } from '../../../../utils/did';

function ClaimForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [attesterCtype, setAttesterCtype] = useState<IAttesterCtype | null>(null);
  const [properties, setProperties] = useState<string[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!params.id) return goBack();
    setLoading(true);
    onLoadAttesterCtype(params.id).then((a) => {
      setAttesterCtype(a);
      const propertyList = [...Object.keys(a.properties ?? {})];
      setProperties(propertyList);
      setLoading(false);
    });
  }, []);

  const goBack = () => navigate('/claimer', { replace: true });

  const onSubmit = async () => {
    if (!user || !attesterCtype) return;
    setLoading(true);
    await createCredential(user.didUri, user.web3name, attesterCtype, form);
    setLoading(false);
    goBack();
  };

  const onChangeInput = (property: string, value: string) =>
    setForm((form: any) => {
      form[property] = value;
      return form;
    });

  const displayName = (attester: IAttesterCtype) => {
    return attester.attesterWeb3name ??
      formatDidUri(attester.attesterDidUri);
  };

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
                  ` ${displayName(attesterCtype)} (${attesterCtype.ctypeName})`}
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
