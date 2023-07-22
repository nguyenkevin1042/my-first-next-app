import PromptCard from './PromptCard'


const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className='w-full'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>
                    {name} Profile
                </span>
            </h1>
            <p className='desc text-left'>
                {desc}
            </p>
            <div className='mt-16 prompt_layout'>
                {data &&
                    data.map(postItem => (
                        <PromptCard
                            key={postItem._id}
                            post={postItem}
                            handleEdit={() => handleEdit && handleEdit(postItem)}
                            handleDelete={() => handleDelete && handleDelete(postItem)} />
                    ))}
            </div>
        </section>

    )
}

export default Profile