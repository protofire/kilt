import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onLoadAttesterCtype } from '../../../../api/claimer/loadAttesterCtype';
import { createCredential } from '../../../../api/credential/createCredential';
import Topbar from '../../../../components/Topbar/Topbar';
import useUser from '../../../../hooks/user';
import { IAttesterCtype } from '../../../../interfaces/attesterCtype';
import { formatDidUri } from '../../../../utils/did';

interface IProperty {
  name: string;
  type: string | undefined;
}

const propToInputType: Record<string, string> = {
  number: 'number',
  integer: 'number',
  string: 'text'
};

function ClaimForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [attesterCtype, setAttesterCtype] = useState<IAttesterCtype | null>(null);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) return goBack();
    setLoading(true);
    onLoadAttesterCtype(params.id).then((a) => {
      setAttesterCtype(a);
      const propertyList: IProperty[] = a.properties
        ? Object.keys(a.properties).map(k => ({
          name: k,
          type: a.properties![k].type?.toString()
        }))
        : [];

      setProperties(propertyList);
      setLoading(false);
    });
  }, [ params ]);

  const goBack = () => navigate('/claimer', { replace: true });

  const onSubmit = useCallback(async () => {
    if (!user || !attesterCtype) return;
    const allDirty = properties.length === Object.keys(form).length;
    const allHaveValue = Object.keys(form).every(k => !!form[k]);
    if (!allDirty || !allHaveValue) {
      setError('You must fill all the fields.');
      return;
    }
    setError('');
    setLoading(true);
    await createCredential(
      user.didUri,
      user.web3name,
      attesterCtype,
      JSON.stringify(form)
    );
    setLoading(false);
    goBack();
  }, [user, attesterCtype, properties, form]);

  const onChangeInput = useCallback((
    property: string,
    value: string,
    type?: string
  ) => {
    const isNumeric = type === 'number' || type === 'integer';
    setForm((form: any) => {
      form[property] = isNumeric ? Number(value) : value;
      return form;
    });
  }, []);

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
          <div className='text wrap'>
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
                  key={k.name}
                  placeholder={`${k.name} (${k.type})`}
                  type={propToInputType[k.type ?? 'string']}
                  onChange={(e) => onChangeInput(k.name, e.target.value, k.type)}
                />)}
            </span>
            <br /><br />
          </div>
          {error && <div className='error'>{error}</div>}
          <div>
            <button className='secondary' onClick={goBack}>Cancel</button>
            <button className='primary' onClick={onSubmit}>Submit</button>
          </div>
        </div>}
    </div>
  );
}

export default ClaimForm;
