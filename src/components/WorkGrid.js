"use client"
import { useState, useMemo } from 'react'
import WorkItem from "@/components/WorkItem"
import Filters from './Filters'

const WorkGrid = ({ allWork }) => {
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedSecteurs, setSelectedSecteurs] = useState([])

    const tagsArray = useMemo(() => {
        return allWork.map(item => item.tags).flat().filter((value, index, self) => self.indexOf(value) === index)
    }, [allWork])

    const secteursArray = useMemo(() => {
        return allWork.map(item => item.data.secteurs.map(secteur => secteur.label)).flat().filter((value, index, self) => self.indexOf(value) === index)
    }, [allWork])

    const handleTagClick = (tag) => {
        setSelectedTags(prevSelected => {
            if (prevSelected.includes(tag)) {
                return prevSelected.filter(item => item !== tag)
            } else {
                return [...prevSelected, tag]
            }
        })
    }

    const handleSecteurClick = (secteur) => {
        setSelectedSecteurs(prevSelected => {
            if (prevSelected.includes(secteur)) {
                return prevSelected.filter(item => item !== secteur)
            } else {
                return [...prevSelected, secteur]
            }
        })
    }

    const filteredWork = useMemo(() => {
        return allWork.filter(item => {
            const hasMatchingTag = selectedTags.length === 0 || item.tags.some(tag => selectedTags.includes(tag))
            const hasMatchingSecteur = selectedSecteurs.length === 0 || item.data.secteurs.some(secteur => selectedSecteurs.includes(secteur.label))

            return hasMatchingTag && hasMatchingSecteur
        })

    }, [allWork, selectedTags, selectedSecteurs])

    return (
        <section className="work_overview">

            <div
                className={`
                    px-[var(--tw-4)] pb-[var(--tw-24)]
                    lg:px-[var(--tw-12)] lg:pb-[var(--tw-48)]
                `}
            >
                    <div
                        className={`
                            pb-4 hidden
                            lg:pb-12 lg:block
                        `}
                    >
                        <Filters
                            tagsArray={tagsArray}
                            secteursArray={secteursArray}
                            selectedTags={selectedTags}
                            selectedSecteurs={selectedSecteurs}
                            handleTagClick={handleTagClick}
                            handleSecteurClick={handleSecteurClick}
                        />
                    </div>

                    <div
                        className={`
                            grid gap-[var(--tw-4)]
                            md:grid-cols-2
                            lg:grid-cols-4 lg:gap-8
                        `}
                    >
                        {filteredWork.map((item, index) => {
                            return (
                                <WorkItem
                                    key={index}
                                    data={item}
                                    index={index}
                                />
                            )
                        }
                        )}
                    </div>

                </div>

        </section>
    )
}

export default WorkGrid