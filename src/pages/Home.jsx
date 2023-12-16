import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
    const [checked, setChecked] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const sector = e.target.sector.value;
        const formData = { name, sector, checked }

        toast.success(`Form updated successfully`)
    }

    const handleClear = () => {
        toast.error(`Form clear successfully`)
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
                            className='rounded-[10px] bg-[#EEE] p-2 text-black w-full mt-2'
                            placeholder='Enter your name'
                            required
                        />
                    </div>

                    {/* Sectors   */}
                    <div className='mt-4'>
                        <label className='text-[16px] text-black font-semibold'>Sectors:</label>
                        <select
                            name="sector"
                            className='rounded-[10px] bg-[#EEE] p-2 text-black w-full mt-2'
                            required
                        >
                            <option selected disabled value=''>Select your sectors</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
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
                            checked={checked}
                            required
                        />
                        <label className='text-[16px] text-black font-semibold cursor-pointer'>Agree to terms</label>
                    </div>

                    <div className='flex mt-6 items-center gap-4'>
                        <button
                            type='submit'
                            className='bg-violet-800 py-2 px-5 rounded-[10px] text-white font-bold text-[18px]'
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            className='bg-red-500 py-2 px-5 rounded-[10px] text-white font-bold text-[18px]'
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;