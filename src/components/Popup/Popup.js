import React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Button, Text, Flex } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import { Label, Input, Textarea } from '@rebass/forms';

import Close from '../../images/close.png';

export default function PopupWithForm({ isOpen, onClose, theme, createCase }) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleChange = (e) => {
        const target = e.target;
        target.name === 'name' ? setName(target.value) : setDescription(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCase(name, description);
        onClose();
        setName('');
        setDescription('');
    };

    return (
        <ThemeProvider theme={theme}>
            <section className={`popup ${isOpen && 'popup-visible'}`}>
                <div className={`popup__container`}>
                    <button className='popup__close-button' onClick={onClose}>
                        <img src={Close} alt='закрыть' className='popup__close-icon' />
                    </button>
                    {isOpen && <EscapeOutside onEscapeOutside={onClose}>
                        <Flex as='form' width={1} height={470} backgroundColor="background" flexDirection={"column"} alignItems={"center"} justifyContent={"space-evenly"} sx={{ borderRadius: 'sketchy0' }} noValidate onSubmit={handleSubmit} >
                            <Text as='h2'>New case</Text>
                            <Flex as='fieldset' width={9 / 10} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"} sx={{ border: "none" }}>
                                <Label htmlFor='name'>Case name</Label>
                                <Input id='name' name='name' value={name || ''} type='text' placeholder='Enter the case name' onChange={handleChange} />
                                <Label htmlFor='description' mt={3}>Case name</Label>
                                <Textarea id='description' name='description' value={description || ''} type='text' placeholder='Enter the case description' height={200} onChange={handleChange} />
                                <Button type='submit' disabled={!name && !description} mt={3} width={200} height={40} variant='success'>Create case</Button>
                            </Flex>
                        </Flex>
                    </EscapeOutside>}
                </div>
            </section>
        </ThemeProvider>
    )
}