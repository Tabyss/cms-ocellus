import React, { useState, useRef, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './richtexteditor.css';

// Import Quill's Delta
const Delta = Quill.import('delta');

interface InputProps {
    mode: boolean
    formData: {
        title?: string;
        content?: string;
    };
    setFormData: (value: any) => void;
}

const RichTextEditor: React.FC<InputProps> = ({ mode, formData, setFormData }) => {
    const [headerValue, setHeaderValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [isReady, setIsReady] = useState(false);

    // Refs for Quill editor containers
    const headerEditorRef = useRef<HTMLDivElement | null>(null);
    const contentEditorRef = useRef<HTMLDivElement | null>(null);

    // Quill instances
    const headerQuillRef = useRef<Quill | null>(null);
    const contentQuillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (formData.title || formData.content) {
            setHeaderValue(formData.title || '');
            setContentValue(formData.content || '');
            setIsReady(true);
        } else if (mode === false){
            setIsReady(true);
        }
    }, [formData, mode]);

    useEffect(() => {
        if (isReady) {
            if (headerEditorRef.current && !headerQuillRef.current) {
                headerQuillRef.current = new Quill(headerEditorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [],
                    },
                    placeholder: 'Enter header text...',
                });

                const initialHeaderContent = headerValue || 'Header Text';
                const initialDelta = new Delta([
                    { insert: initialHeaderContent + '\n', attributes: { header: 1 } },
                ]);
                headerQuillRef.current.setContents(initialDelta);
                headerQuillRef.current.format('align', 'center');

                headerQuillRef.current.on('text-change', () => {
                    const text = headerQuillRef.current?.getText().trim() || '';
                    setHeaderValue(text);
                    setFormData((prev: any) => ({
                        ...prev,
                        title: text,
                    }));
                });
            }

            if (contentEditorRef.current && !contentQuillRef.current) {
                // Initialize content Quill editor
                contentQuillRef.current = new Quill(contentEditorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [{ align: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            ['bold', 'italic', 'underline', 'strike'],
                            // ['image'],
                        ],
                    },
                    placeholder: 'Enter content text...',
                });

                const initialContent = contentValue || '';
                contentQuillRef.current.root.innerHTML = initialContent;

                contentQuillRef.current.on('text-change', () => {
                    const text = contentQuillRef.current?.root.innerHTML || '';
                    const length = contentQuillRef.current?.getLength() || 0
                    setContentValue(length > 1 ? text : '');
                    setFormData((prev: any) => ({
                        ...prev,
                        content: length > 1 ? text : '',
                    }));
                });
            }
        }
    }, [isReady,formData, headerValue, contentValue]);
    
    return (
        <Flex direction="column" gap={4}>
            <Flex className="editor-header" flexDir="column">
                <Flex
                    ref={headerEditorRef}
                    w="100%"
                    h="100px"
                    border="1px solid #ccc"
                    borderRadius="4px"
                    p="2"
                />
            </Flex>
            <Flex className="editor-container" flexDir="column">
                <Flex
                    ref={contentEditorRef}
                    w="100%"
                    h="200px"
                    border="1px solid #ccc"
                    borderRadius="4px"
                    p="2"
                />
            </Flex>
        </Flex>
    );
};

export default RichTextEditor;
