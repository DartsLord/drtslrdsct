import IndicationDB from "@/components/db_indication";
import ProjectInfo from "@/components/info_indication";
import Memory from "@/components/memory";
import Disk from "@/components/disk";

export default async function Home() {
    return (
        <>
            <section className='bg-black min-h-screen pt-20'>
                <div className='max-w-4xl mx-auto bg-gray-900 text-white rounded-md p-10 justify-center items-center'>
                    <div className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 gap-1 ml-auto justify-center mt-2.5">
                        <div className={'p-4 max-w-sm'}>
                            <IndicationDB/>
                            <Memory/>
                            <Disk/>
                        </div>
                        <div className={'p-4 max-w-sm'}>
                            <ProjectInfo/>
                            <br />
                            <br />
                            <br />
                            <p><i>Darts Lord Sct</i></p>
                            <p><i>writtenBy(Closegamer, 2024)</i></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
