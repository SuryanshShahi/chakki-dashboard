'use client';
import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import Chip from '@/app/shared/Chip';
import Divider from '@/app/shared/Divider';
import Loader from '@/app/shared/Loader';
import Text from '@/app/shared/Text';
import BtnGroup from '@/app/shared/buttons/BtnGroup';
import Button from '@/app/shared/buttons/Button';
import { Option } from '@/app/shared/dropdown';
import AsyncCreatableDropDown from '@/app/shared/dropdown/AsyncCreatableDropDown';
import Dropzone from '@/app/shared/dropzone';
import Heading from '@/app/shared/heading/Heading';
import InputField from '@/app/shared/inputField';
import LabelWithError from '@/app/shared/labelWithError';
import { BOOLEAN_OPTIONS, extractLatLng } from '@/app/utils/constants';
import { FileTypes } from '@/app/utils/enum';
import { localize } from '@/i18n/dictionaries';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IAddChakki } from '../types';
import { useHook } from './useHook';

export function AddChakki() {
  const {
    formikProps,
    merchantOptions,
    isLoadingMerchants,
    loadMerchantOptions,
  } = useHook();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  const generatedLatLng = extractLatLng(values.mapLink || '');

  console.log({ values });

  if (isLoadingMerchants) return <Loader variant='full-screen' />;

  return (
    <PageWrapper
      breadCrumbs={[{ label: 'Chakkis', path: '/chakkis' }, { label: 'Add' }]}
    >
      <div className='space-y-6'>
        <Heading variant='h1' className='!text-3xl'>
          Add Chakki
        </Heading>
        <Divider variant='secondary' />
        <div className='border border-secondary rounded-xl bg-white p-6 gap-y-4 grid grid-cols-2 gap-x-4'>
          <InputField
            required
            label={localize('name')}
            placeholder={localize('enter_chakki_name')}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values?.name}
            errorMessage={errors?.name && touched?.name ? errors?.name : ''}
            type='text'
            wrapperClass='border p-2 rounded'
          />
          <InputField
            required
            prefix='#'
            label={localize('code')}
            placeholder={localize('enter_chakki_code')}
            onChange={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values?.code}
            errorMessage={errors?.code && touched?.code ? errors?.code : ''}
            type='text'
            wrapperClass='border p-2 rounded'
          />
          <AsyncCreatableDropDown
            name='merchant'
            required
            options={merchantOptions}
            label='Owner'
            placeholder='Enter Name, Email or Phone'
            className='w-full cursor-pointer'
            isLoading={isLoadingMerchants}
            useInternalState={false}
            isMulti={false}
            onLoadOptions={loadMerchantOptions}
            onChangeDropdown={(selected: Option) => {
              setFieldValue('merchant', selected || null);
            }}
            onCreateNew={(key) => {
              console.log('key');
            }}
            value={values.merchant || null}
            {...formikProps}
          />
          <div className='space-y-2'>
            <Text size='sm' variant='secondary'>
              Does the Chakki take Customer Requests
            </Text>
            <BtnGroup
              buttons={BOOLEAN_OPTIONS}
              onClick={(btn) => {
                setFieldValue(
                  'isCustomerRequestAvailable',
                  btn.value === 'yes'
                );
              }}
              className='text-sm'
              selected={values.isCustomerRequestAvailable ? 'yes' : 'no'}
            />
          </div>
          <InputField
            label={localize('min_order_value')}
            placeholder={localize('enter_min_order_value')}
            onChange={handleChange('minOrderAmount')}
            onBlur={handleBlur('minOrderAmount')}
            value={values?.minOrderAmount}
            errorMessage={
              errors?.minOrderAmount && touched?.minOrderAmount
                ? errors?.minOrderAmount
                : ''
            }
            type='number'
            wrapperClass='border p-2 rounded'
          />
          <InputField
            label={localize('delivery_range')}
            placeholder={
              localize('enter_delivery_range') + ' (' + localize('in_kms') + ')'
            }
            onChange={handleChange('deliveryRangeInKms')}
            onBlur={handleBlur('deliveryRangeInKms')}
            value={values?.deliveryRangeInKms}
            errorMessage={
              errors?.deliveryRangeInKms && touched?.deliveryRangeInKms
                ? errors?.deliveryRangeInKms
                : ''
            }
            type='number'
            wrapperClass='border p-2 rounded'
          />
          <InputField
            required
            label={localize('map_link')}
            placeholder={localize('enter_google_maps_link')}
            onChange={handleChange('mapLink')}
            onBlur={handleBlur('mapLink')}
            value={values?.mapLink}
            errorMessage={
              errors?.mapLink && touched?.mapLink ? errors?.mapLink : ''
            }
            type='text'
            wrapperClass='border p-2 rounded col-span-2'
            helperText={
              values.mapLink
                ? `Latitude: ${generatedLatLng?.latitude}; Longitude: ${generatedLatLng?.longitude}`
                : undefined
            }
          />
          <div className='space-y-2'>
            <InputField
              label={'External store links'}
              placeholder={'Add external store links (if any)'}
              onChange={handleChange('link')}
              onBlur={handleBlur('link')}
              type='text'
              errorMessage={errors?.link && touched?.link ? errors?.link : ''}
              value={values.link}
              wrapperClass='border p-2 rounded w-full'
              icon={
                <IoIosAddCircleOutline
                  size={20}
                  onClick={() => {
                    if (errors.link || !values.link) {
                      return;
                    }
                    const newExternalLink = [
                      ...(values.externalStoreLinks || []),
                      values.link,
                    ];
                    setFieldValue('externalStoreLinks', newExternalLink);
                    setFieldValue('link', '');
                  }}
                />
              }
            />
            <div className='flex gap-2 flex-wrap'>
              {values?.externalStoreLinks?.map((l, index) => (
                <Chip
                  key={index}
                  title={l}
                  handleRemove={() => {
                    const newExternalLink = values.externalStoreLinks?.filter(
                      (_, idx) => idx !== index
                    );
                    setFieldValue('externalStoreLinks', newExternalLink);
                  }}
                />
              ))}
            </div>
          </div>
          <div className='col-span-2 space-y-2'>
            <Text size='sm' variant='secondary'>
              Contact Details of person that helps operate the chakki
            </Text>
            <BtnGroup
              buttons={BOOLEAN_OPTIONS}
              onClick={(btn) => {
                setFieldValue('showExtraContactInfo', btn.value === 'yes');
              }}
              className='text-sm'
              selected={values.showExtraContactInfo ? 'yes' : 'no'}
            />
          </div>
          {values?.showExtraContactInfo && (
            <div className='col-span-2 grid grid-cols-2 gap-4'>
              <InputField
                label={'Helper Name'}
                placeholder={'Any other person that help operates the chakki'}
                onChange={handleChange('contactDetails.name')}
                onBlur={handleBlur('contactDetails.name')}
                value={values?.contactDetails?.name}
                errorMessage={
                  (errors?.contactDetails as IAddChakki['contactDetails'])
                    ?.name &&
                  (touched?.contactDetails as IAddChakki['contactDetails'])
                    ?.name
                    ? (errors?.contactDetails as IAddChakki['contactDetails'])
                        ?.name
                    : ''
                }
                type='text'
                wrapperClass='border p-2 rounded'
              />
              <InputField
                label={'Helper Phone'}
                placeholder={'Any other person that help operates the chakki'}
                onChange={handleChange('contactDetails.phone')}
                onBlur={handleBlur('contactDetails.phone')}
                value={values?.contactDetails?.phone}
                errorMessage={
                  (errors?.contactDetails as IAddChakki['contactDetails'])
                    ?.phone &&
                  (touched?.contactDetails as IAddChakki['contactDetails'])
                    ?.phone
                    ? (errors?.contactDetails as IAddChakki['contactDetails'])
                        ?.phone
                    : ''
                }
                type='text'
                wrapperClass='border p-2 rounded'
              />
              <InputField
                label={'Helper Email'}
                placeholder={'Any other person that help operates the chakki'}
                onChange={handleChange('contactDetails.email')}
                onBlur={handleBlur('contactDetails.email')}
                value={values?.contactDetails?.email}
                errorMessage={
                  (errors?.contactDetails as IAddChakki['contactDetails'])
                    ?.email &&
                  (touched?.contactDetails as IAddChakki['contactDetails'])
                    ?.email
                    ? (errors?.contactDetails as IAddChakki['contactDetails'])
                        ?.email
                    : ''
                }
                type='text'
                wrapperClass='border p-2 rounded'
              />
            </div>
          )}

          <LabelWithError
            name='images'
            className='w-full'
            label='Images'
            errorMessage={errors?.images}
          >
            <Dropzone
              name='images'
              isFilePreview
              datatestid='images'
              allowedFileTypes={[FileTypes.JPEG, FileTypes.PNG]}
              isMultiple
              error={!!errors.images}
              onChange={(files) => {
                if (!files.length) return;
                setFieldValue('images', files);
              }}
              resolution={{ height: 700, width: 800 }}
            />
          </LabelWithError>
        </div>
        <Button
          size='sm'
          btnName='Submit'
          onClick={() => handleSubmit()}
          className='ml-auto'
        />
      </div>
    </PageWrapper>
  );
}
