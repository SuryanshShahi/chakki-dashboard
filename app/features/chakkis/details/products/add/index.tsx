'use client';
import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import Chip from '@/app/shared/Chip';
import Divider from '@/app/shared/Divider';
import Loader from '@/app/shared/Loader';
import Text from '@/app/shared/Text';
import BtnGroup from '@/app/shared/buttons/BtnGroup';
import Button from '@/app/shared/buttons/Button';
import DropdownField from '@/app/shared/dropdown';
import Dropzone from '@/app/shared/dropzone';
import Heading from '@/app/shared/heading/Heading';
import InputField from '@/app/shared/inputField';
import LabelWithError from '@/app/shared/labelWithError';
import { BOOLEAN_OPTIONS, MEASUREMENT_UNITS } from '@/app/utils/constants';
import { FileTypes } from '@/app/utils/enum';
import { localize } from '@/i18n/dictionaries';
import { UUID } from 'crypto';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useHook } from './useHook';

export function AddProduct({ chakkiId }: { chakkiId: UUID }) {
  const { formikProps, isLoadingProductDetails, chakkiDetails, isBtnDisabled } =
    useHook(chakkiId);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = formikProps;

  if (isLoadingProductDetails) return <Loader />;

  return (
    <PageWrapper
      breadCrumbs={[
        { label: 'Chakkis', path: '/chakkis' },
        { label: chakkiDetails?.name || 'Name', path: `/chakkis/${chakkiId}` },
        {
          label: 'Products',
          path: `/chakkis/${chakkiId}?tab=products`,
        },
        { label: 'Add' },
      ]}
    >
      <div className='space-y-6'>
        <Heading variant='h1' className='!text-3xl'>
          Add Product
        </Heading>
        <Divider variant='secondary' />
        <div className='border border-secondary rounded-xl bg-white p-6 gap-y-4 grid grid-cols-2 gap-x-4'>
          <InputField
            required
            label={localize('name')}
            placeholder={localize('enter_product_name')}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            errorMessage={errors.name && touched?.name ? errors.name : ''}
            type='text'
          />
          <InputField
            required
            prefix='#'
            label={localize('code')}
            placeholder={localize('enter_product_code')}
            onChange={(e) => {
              setFieldValue('code', e.toUpperCase());
            }}
            onBlur={handleBlur('code')}
            value={values.code}
            errorMessage={errors.code && touched?.code ? errors.code : ''}
            type='text'
          />
          <InputField
            required
            label={localize('description')}
            placeholder={localize('enter_product_description')}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            errorMessage={
              errors.description && touched?.description
                ? errors.description
                : ''
            }
            type='text'
          />
          {chakkiDetails?.isCustomerRequestAvailable && (
            <div className='space-y-2'>
              <Text size='sm' variant='secondary'>
                Are Customer Requests available on the product
              </Text>
              <BtnGroup
                buttons={BOOLEAN_OPTIONS}
                onClick={(btn) => {
                  setFieldValue('takeCustomerRequests', btn.value === 'yes');
                }}
                className='text-sm'
                selected={values.takeCustomerRequests ? 'yes' : 'no'}
              />
            </div>
          )}
          <div />
          <InputField
            required
            label={localize('price_per_unit')}
            placeholder={localize('enter_min_order_value')}
            onChange={handleChange('pricePerUnit')}
            onBlur={handleBlur('pricePerUnit')}
            value={values.pricePerUnit}
            errorMessage={
              errors.pricePerUnit && touched?.pricePerUnit
                ? errors.pricePerUnit
                : ''
            }
            type='number'
          />
          <DropdownField
            name={'measurementUnit'}
            options={MEASUREMENT_UNITS}
            placeholder={localize('enter_measurement_unit')}
            onChangeDropdown={(e) => {
              setFieldValue('measurementUnit', e);
            }}
            {...formikProps}
          />

          <div className='space-y-2'>
            <InputField
              label={'External store links'}
              placeholder={'Add external store links (if any)'}
              onChange={handleChange('link')}
              onBlur={handleBlur('link')}
              type='text'
              errorMessage={errors.link && touched?.link ? errors.link : ''}
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
            {values.externalStoreLinks ? (
              <div className='flex gap-2 flex-wrap'>
                {values.externalStoreLinks?.map((l, index) => (
                  <Chip
                    key={index}
                    title={l?.length > 50 ? l.slice(0, 50) + '...' : l}
                    handleRemove={() => {
                      const newExternalLink = values.externalStoreLinks?.filter(
                        (_, idx) => idx !== index
                      );
                      setFieldValue('externalStoreLinks', newExternalLink);
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <LabelWithError
            name='images'
            label='Images'
            errorMessage={errors.images}
            wrapperClassName='col-span-2'
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
          disabled={isBtnDisabled}
        />
      </div>
    </PageWrapper>
  );
}
