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

import { useState, useEffect } from '@wordpress/element';

import { link, linkOff } from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, isSelected}) {

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! attributes.link;

	const unlink = () => {
		setAttributes( { link: undefined } );
		setIsEditingURL( false );
	}

	const startEditing = ( event ) => {
		event.preventDefault();
		setIsEditingURL( true );
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );

	return (
		<>
		{/* Toolbar zone */}
		<BlockControls>
			<ToolbarGroup>
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						onClick={ startEditing }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						onClick={ unlink }
						isActive
					/>
				) }
			</ToolbarGroup>
			{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					onClose={ () => {
						setIsEditingURL( false );
					} }
					placement="top"
				>
					<LinkControl
						searchInputPlaceholder={__('Zoek of typ URL', 'reactions-block')}
						value={ attributes.link }
						onChange={ ( newLink ) => {
							setAttributes( { link: {...newLink} } )
						} }
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ isEditingURL }
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
						onChange={(quote) => setAttributes({quote: quote})}
						placeholder={__( 'Citaat...', 'reactions-block')}
					/>
				</blockquote>

				<figcaption>
					&mdash;&nbsp;
					<RichText 
						tagName='span'
						allowedFormats={[]}
						value={attributes.author}
						onChange={(author) => setAttributes({author: author})}
						placeholder={__( 'Auteur (bijv. William Shakespeare)', 'reactions-block')}
					/>,&nbsp;
					<RichText 
						tagName='cite'
						allowedFormats={[]}
						value={attributes.publication}
						onChange={(publication) => setAttributes({publication: publication})}
						placeholder={__( 'Publicatie (bijv. Theaterkrant)', 'reactions-block')}
					/>
				</figcaption>
			</figure>
		</li>
		{/* End Main block zone */}
		</>
	);
}
