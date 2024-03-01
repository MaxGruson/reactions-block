/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {__experimentalLinkControl as LinkControl, useBlockProps, RichText, BlockControls} from '@wordpress/block-editor';

import { ToolbarGroup, ToolbarButton, Popover, Button } from '@wordpress/components';

import { useState } from '@wordpress/element';

import { link } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const [ showLinkPopover, setShowLinkPopover ] = useState( false );
	const toggleLinkPopover = () => {
			setShowLinkPopover( ( state ) => ! state );
	};

	return (
		<>
		{/* Toolbar zone */}
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={link}
					label={__('Link', 'reactions-block')}
					onClick={toggleLinkPopover}
					isPressed={showLinkPopover}
				/>
			</ToolbarGroup>
			{showLinkPopover && (
				<Popover>
					<LinkControl
						searchInputPlaceholder={__('Zoek of typ URL', 'reactions-block')}
						value={ attributes.link }
						onChange={ ( newLink ) => {
							setAttributes( { link: {...newLink || ''} } ) }
						}
					>
					</LinkControl>
				</Popover>
			)}
		</BlockControls>
		{/* End Toolbar zone */}

		{/* Main block zone */}
    <li className='reactions__reaction'>
      <figure { ...useBlockProps() }>
        <blockquote cite={attributes.link}>
          <RichText 
            tagName='p'
            allowedFormats={[
                'core/italic',
                'core/bold',
                'core/strikethrough',
                'core/subscript',
                'core/superscript',
                'core/underline'
              ]}
            value={attributes.quote}
            onChange={(quote) => setAttributes({quote})}
            placeholder={__( 'Citaat...', 'cta-block')}
          />
        </blockquote>

        <figcaption>
          &mdash;&nbsp;
          <RichText 
            tagName='span'
            allowedFormats={[]}
            value={attributes.author}
            onChange={(author) => setAttributes({author})}
            placeholder={__( 'Auteur (bijv. William Shakespeare)', 'reactions-block')}
          />,&nbsp;
          <RichText 
            tagName='cite'
            allowedFormats={[]}
            value={attributes.publication}
            onChange={(publication) => setAttributes({publication})}
            placeholder={__( 'Publicatie (bijv. Theaterkrant)', 'reactions-block')}
          />
        </figcaption>
      </figure>
    </li>
		{/* End Main block zone */}
		</>
	);
}
