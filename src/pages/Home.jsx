import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const Home = () => {
    const [checked, setChecked] = useState(false);
    const [sectorsData, setSectorsData] = useState([])
    const [formData, setFormData] = useState({})
    const [refetch, setRefetch] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)


    useEffect(() => {
        fetch('https://form-server-six.vercel.app/sectors')
            .then(res => res.json())
            .then(data => {
                setSectorsData(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://form-server-six.vercel.app/form')
            .then(res => res.json())
            .then(data => {
                setFormData(data)
                setIsUpdate(data?.name)
            })
    }, [refetch])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const sector = e.target.sector.value;
        const updateData = { ...formData, name, sector, terms: checked }
        fetch('https://form-server-six.vercel.app/form-update',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(updateData)
            }
        )
            .then(res => res.json())
            .then(data => {
                toast.success(data.message);
                setRefetch(data)
            })
    }

    const handleClear = () => {
        toast.error(`Form clear successfully`)
        fetch('https://form-server-six.vercel.app/form-clear',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            }
        )
            .then(res => res.json)
            .then(data => {
                toast.error(data.message);
                setRefetch(data)

            })
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center'>
            <div className='container w-11/12 lg:w-8/12 mx-auto rounded-xl p-5 bg-[#ffffff55] shadow-xl'>
                <h1 className='text-center text-[25px] lg:text-[40px] font-bold'>Form</h1>
                <h3 className='text-center text-[16px] text-gray-600 my-4'>
                    Please enter your name and pick the Sectors you are currently involved in.
                </h3>
                <form onSubmit={onSubmit}>

                    {/* name   */}
                    <div>
                        <label className='text-[16px] text-black font-semibold'>Name:</label>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            className='rounded-[10px] bg-[#EEE] p-2 text-black w-full mt-2'
                            placeholder='Enter your name'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Sectors   */}
                    <div className='mt-4'>
                        <label className='text-[16px] text-black font-semibold'>Sectors:</label>
                        <select
                            name="sector"
                            className='rounded-[10px] bg-[#EEE] p-2 text-black w-full mt-2'
                            value={formData.sector}
                            onChange={handleChange}
                            required
                        >
                            <option selected disabled value=''>Select your sectors</option>
                            {
                                sectorsData.map(item => <React.Fragment
                                    key={item?.name}
                                >
                                    <option disabled className='font-bold'>{item?.name}</option>
                                    {
                                        item?.values?.length > 0 && item?.values?.map((x, i) => <React.Fragment
                                            key={x + i}
                                        >
                                            {
                                                x?.subName ? <React.Fragment>
                                                    <option
                                                        value={x?.subName}
                                                        style={{ textIndent: '100px' }}
                                                    >&nbsp;&nbsp;&nbsp;&nbsp;{x?.subName}</option>
                                                    {
                                                        x?.subValues?.length > 0 && x.subValues.map((y, index) =>
                                                            <option
                                                                key={y + index}
                                                                value={y}
                                                            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y} </option>
                                                        )}
                                                </React.Fragment>
                                                    : <option value={x}>&nbsp;&nbsp;&nbsp;&nbsp;{x} </option>
                                            }
                                        </React.Fragment>)
                                    }
                                </React.Fragment>

                                )
                            }
                        </select>
                    </div>

                    {/* Agree to terms   */}
                    <div
                        className='mt-4 flex items-center gap-2 w-fit'
                        onClick={() => setChecked(!checked)}
                    >
                        <input
                            type="checkbox"
                            name='terms'
                            className='rounded scale-110'
                            // checked={formData.checked || checked}
                            defaultChecked={checked || formData.terms}
                            required
                        />
                        <label className='text-[16px] text-black font-semibold cursor-pointer'>Agree to terms</label>
                    </div>

                    {/* button  */}
                    <div className='flex mt-6 items-center gap-4'>
                        {
                            isUpdate ?
                                <>
                                    <button
                                        type='submit'
                                        className='bg-violet-800 py-2 px-5 rounded-[10px] text-white font-bold text-[18px]'
                                    >
                                        Update
                                    </button>
                                    <button
                                        type='button'
                                        className='bg-red-500 py-2 px-5 rounded-[10px] text-white font-bold text-[18px]'
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </button>
                                </>
                                :
                                <button
                                    type='submit'
                                    className='bg-violet-800 py-2 px-5 rounded-[10px] text-white font-bold text-[18px]'
                                >
                                    Save
                                </button>

                        }
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Home;